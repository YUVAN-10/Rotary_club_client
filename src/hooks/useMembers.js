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
            // Check if member account is disabled / inactive
            const isExplicitlyDisabled =
              data.isActive === false ||
              data.isActive === "false" ||
              data.disabled === true ||
              data.disabled === "true" ||
              data.isDisabled === true ||
              data.isDisabled === "true" ||
              data.status?.toString().toLowerCase().trim() === "disabled" ||
              data.status?.toString().toLowerCase().trim() === "inactive";

            if (isExplicitlyDisabled) {
              return; // Skip disabled accounts
            }

            memberList.push({
              id: doc.id,
              ...data,
              dob: data.dob || data.dateOfBirth || data.birthDate || "",
              weddingDate: data.weddingDate || data.anniversaryDate || data.marriageDate || "",
              // Fallback vertical if empty
              vertical: data.vertical?.trim() || "Rotarian",
              status: data.status || "Active",
            });
          }
        });

        // Sort alphabetically by member name
        memberList.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase().trim();
          const nameB = (b.name || "").toLowerCase().trim();
          return nameA.localeCompare(nameB);
        });

        setMembers(memberList);
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
