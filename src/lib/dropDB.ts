import { db } from "@/configs/firebase";
import { collection, deleteDoc, getDocs } from 'firebase/firestore';


async function dropDatabase() {
    try {
        let collectionRef = collection(db, 'courses');
        let querySnapshot = await getDocs(collectionRef);

        for (const doc of querySnapshot.docs) {
            console.log(`Deleting course ${doc.id}`);
            await deleteDoc(doc.ref);
        }

        collectionRef = collection(db, 'students');
        querySnapshot = await getDocs(collectionRef);

        for (const doc of querySnapshot.docs) {
            console.log(`Deleting student ${doc.id}`);
            await deleteDoc(doc.ref);
        }

        console.log("Database dropped successfully.");
    } catch (error) {
        console.error("Error dropping database:", error);
    }
}

// drop db collection
dropDatabase().then(() => {
    console.log('Deleting process finished. Exiting...');
    process.exit(0);
}).catch((error) => {
    console.error('An error occurred during the deleting process:', error);
    process.exit(1);
});