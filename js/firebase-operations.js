import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// --- STUDENT OPERATIONS ---
export async function getStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const students = [];
        querySnapshot.forEach((doc) => {
            students.push({ id: doc.id, ...doc.data() });
        });
        return students;
    } catch (e) {
        console.error("Error fetching students: ", e);
        return [];
    }
}

// --- COURSE OPERATIONS ---
export async function getCourses() {
    try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() });
        });
        return courses;
    } catch (e) {
        console.error("Error fetching courses: ", e);
        return [];
    }
}

export async function addCourseVideo(category, title, driveLink) {
    try {
        const docRef = await addDoc(collection(db, "course_videos"), {
            category: category,
            title: title,
            driveLink: driveLink,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding video: ", e);
        throw e;
    }
}

export async function getCourseVideos() {
    try {
        const querySnapshot = await getDocs(collection(db, "course_videos"));
        const videos = [];
        querySnapshot.forEach((doc) => {
            videos.push({ id: doc.id, ...doc.data() });
        });
        return videos;
    } catch (e) {
        console.error("Error fetching course videos: ", e);
        return [];
    }
}

// --- COMMUNITY POSTS ---
export async function getCommunityPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, "community_posts"));
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
    } catch (e) {
        console.error("Error fetching posts: ", e);
        return [];
    }
}
