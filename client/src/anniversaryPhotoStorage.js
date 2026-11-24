const PHOTO_DATABASE = 'anniversary-year-two-photo';
const PHOTO_STORE = 'photos';
const PHOTO_KEY = 'first-photo';

function openPhotoDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(PHOTO_DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(PHOTO_STORE)) {
        request.result.createObjectStore(PHOTO_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readAnniversaryPhoto() {
  const database = await openPhotoDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE, 'readonly');
    const request = transaction.objectStore(PHOTO_STORE).get(PHOTO_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

export async function saveAnniversaryPhoto(blob) {
  const database = await openPhotoDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE, 'readwrite');
    transaction.objectStore(PHOTO_STORE).put(blob, PHOTO_KEY);
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function deleteAnniversaryPhoto() {
  const database = await openPhotoDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE, 'readwrite');
    transaction.objectStore(PHOTO_STORE).delete(PHOTO_KEY);
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}
