import { useState, useEffect } from 'react';
import {
  getDocs, deleteDoc, collection, doc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export function Read() {
  const [blogs, setBlogs] = useState([]);
  const BlogsArticle = collection(db, 'Articles');

  const getBlogArticle = async () => {
    const data = await getDocs(BlogsArticle);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setBlogs(filteredData);
  };
  const handleDelete = async (id) => {
    const todoDoc = doc(db, 'Articles', id);
    await deleteDoc(todoDoc);
    getBlogArticle();
  };

  useEffect(() => {
    getBlogArticle();
  }, []);

  return (
    <div
      style={{
        maxWidth: '800px',
        maxHeight: '800px',
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
      }}
    >
      {blogs.map((article, index) => (
        <div className="blog-card" key={index}>
          <h2>{article.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          <button className="btn" onClick={() => handleDelete(article.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
