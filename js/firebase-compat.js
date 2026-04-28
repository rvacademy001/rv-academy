// Firebase Config & Initialization (Compat mode for file:// protocol support)
const firebaseConfig = {
  apiKey: "AIzaSyBdmZI1Gso0XmWWMdUWbLzunhmCorvLKAc",
  authDomain: "rvacademy-0.firebaseapp.com",
  projectId: "rvacademy-0",
  storageBucket: "rvacademy-0.firebasestorage.app",
  messagingSenderId: "56779915896",
  appId: "1:56779915896:web:2dd1a3280e3a6e1efc238d",
  measurementId: "G-S2JY7YKKGG"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- STUDENT OPERATIONS ---
async function getStudents() {
    try {
        const querySnapshot = await db.collection("users").get();
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
async function getCourses() {
    try {
        const querySnapshot = await db.collection("courses").get();
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

async function getCourseVideos() {
    try {
        const querySnapshot = await db.collection("course_videos").get();
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

async function addCourseVideo(category, title, driveLink) {
    try {
        const docRef = await db.collection("course_videos").add({
            category: category,
            title: title,
            driveLink: driveLink,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding video: ", e);
        throw e;
    }
}

// --- COMMUNITY POSTS ---
async function getCommunityPosts() {
    try {
        const querySnapshot = await db.collection("community_posts").get();
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

// Make functions globally available
window.db = db;
window.getStudents = getStudents;
window.getCourses = getCourses;
window.getCourseVideos = getCourseVideos;
window.addCourseVideo = addCourseVideo;
window.getCommunityPosts = getCommunityPosts;
