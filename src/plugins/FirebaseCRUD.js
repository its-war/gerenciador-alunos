import firebaseApp from "@/plugins/firebaseApp";
import
  { getFirestore, collection, getDoc, getDocs, deleteDoc, updateDoc, doc, setDoc, query, orderBy, limit, startAfter, endBefore, limitToLast }
from "firebase/firestore";

export default class FirebaseCRUD {
  constructor (name) {
    this.tableName = name;
    this.database = getFirestore(firebaseApp);
    this.collection = collection(this.database, this.tableName);
  }

  async getAll(){
    try{
      const snapshot = await getDocs(this.collection);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      return data;
    }catch (e){
      console.error(e);
      return [];
    }
  }

  async get(id){
    try{
      const documentRef = doc(this.database, this.tableName, id);
      const docSnap = await getDoc(documentRef);
      if (!docSnap.exists()) return null;
      return {id: docSnap.id, ...docSnap.data()};
    }catch (e){
      console.error(e);
      return null;
    }
  }

  async save(documentObject, documentId = null){
    try{
      const documentRef = documentId ? doc(this.collection, documentId) : doc(this.collection);
      await setDoc(documentRef, documentObject);
      return {id: documentRef.id, ...documentObject};
    }catch (e){
      console.error(e);
    }
  }

  async edit(documentObject, documentId){
    try{
      const documentRef = doc(this.collection, documentId ? documentId : documentObject.id);
      await updateDoc(documentRef, documentObject);
      return true;
    }catch (e){
      console.error(e);
      return false;
    }
  }

  async delete(documentId){
    try{
      const documentRef = doc(this.collection, documentId);
      await deleteDoc(documentRef);
      return true;
    }catch (e){
      console.error(e);
      return false;
    }
  }

  async getFirstPage(pageSize = 10, orderField = 'id', mode = 'asc'){
    try{
      const q = query(
        this.collection,
        orderBy(orderField, mode),
        limit(pageSize + 1)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      const hasNextPage = data.length > pageSize;
      if (hasNextPage) data.pop();
      return {
        data,
        hasNextPage
      };
    }catch (e){
      console.error(e);
      return {
        data: [],
        hasNextPage: false
      };
    }
  }

  async getNextPage(lastItemValue, pageSize = 10, orderField = 'id', mode = 'asc'){
    try{
      const q = query(
        this.collection,
        orderBy(orderField, mode),
        startAfter(lastItemValue),
        limit(pageSize + 1)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      const hasNextPage = data.length > pageSize;
      if (hasNextPage) data.pop();
      return {
        data,
        hasNextPage
      };
    }catch (e){
      console.error(e);
      return {
        data: [],
        hasNextPage: false
      };
    }
  }

  async getPreviousPage(firstItemValue, pageSize = 10, orderField = 'id', mode = 'asc'){
    try{
      const q = query(
        this.collection,
        orderBy(orderField, mode),
        endBefore(firstItemValue),
        limitToLast(pageSize + 1)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      const hasNextPage = data.length > pageSize;
      if (hasNextPage) data.pop();
      return {
        data,
        hasNextPage
      };
    }catch (e){
      console.error(e);
      return {
        data: [],
        hasNextPage: false
      };
    }
  }
}
