<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <span v-if="!book.editing">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEdit(book)" class="btn btn-sm btn-primary ms-2">Edit</button>
          <button @click="deleteBook(book.id)" class="btn btn-sm btn-danger ms-1">Delete</button>
        </span>
        <span v-else>
          <input v-model="book.editName" type="text" placeholder="Book Name" class="form-control d-inline-block w-auto">
          <input v-model="book.editIsbn" type="number" placeholder="ISBN" class="form-control d-inline-block w-auto ms-2">
          <button @click="saveEdit(book)" class="btn btn-sm btn-success ms-2">Save</button>
          <button @click="cancelEdit(book)" class="btn btn-sm btn-secondary ms-1">Cancel</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

  export default {
    setup() {
      const books = ref([]);

      const fetchBooks = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '>', 1000));
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({
              id: doc.id,
              ...doc.data(),
              editing: false,
              editName: '',
              editIsbn: ''
            });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };

      const startEdit = (book) => {
        book.editing = true;
        book.editName = book.name;
        book.editIsbn = book.isbn;
      };

      const cancelEdit = (book) => {
        book.editing = false;
        book.editName = '';
        book.editIsbn = '';
      };

      const saveEdit = async (book) => {
        try {
          const isbnNumber = Number(book.editIsbn);
          if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
          }

          await updateDoc(doc(db, 'books', book.id), {
            name: book.editName,
            isbn: isbnNumber
          });

          book.name = book.editName;
          book.isbn = isbnNumber;
          book.editing = false;
          alert('Book updated successfully!');
        } catch (error) {
          console.error('Error updating book: ', error);
          alert('Error updating book');
        }
      };

      const deleteBook = async (bookId) => {
        if (confirm('Are you sure you want to delete this book?')) {
          try {
            await deleteDoc(doc(db, 'books', bookId));
            books.value = books.value.filter(book => book.id !== bookId);
            alert('Book deleted successfully!');
          } catch (error) {
            console.error('Error deleting book: ', error);
            alert('Error deleting book');
          }
        }
      };

      onMounted(() => {
        fetchBooks();
      });

      return { books, startEdit, cancelEdit, saveEdit, deleteBook };
    }
  }
</script>
