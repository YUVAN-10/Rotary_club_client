import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const membersRef = collection(db, "members");

    // Real-time listener for the members collection
    const unsubscribe = onSnapshot(
      membersRef,
      (snapshot) => {
        const memberList = [];
        let completedCount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          // Exclude completely empty documents
          if (data.name || data.phone || data.memberAddress) {
            if (data.status === "Completed") {
              completedCount++;
            }
            memberList.push({
              id: doc.id,
              ...data,
              // Fallback vertical if empty
              vertical: data.vertical?.trim() || "Rotarian",
              status: data.status || "Active",
            });
          }
        });

        // If there are members explicitly marked "Completed", filter for those;
        // Otherwise, show all imported/available members so records are not hidden
        const activeMembers =
          completedCount > 0
            ? memberList.filter((m) => m.status === "Completed")
            : memberList;

        // Sort alphabetically by member name
        activeMembers.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase().trim();
          const nameB = (b.name || "").toLowerCase().trim();
          return nameA.localeCompare(nameB);
        });

        setMembers(activeMembers);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching members from Firestore:", err);
        setError(err.message || "Failed to load members from Firestore");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { members, loading, error };
};
