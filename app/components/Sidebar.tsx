"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>
        🎓 KidVision
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link
          href="/teacher/dashboard"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          📊 Dashboard
        </Link>

        <div style={{ marginTop: "20px", fontSize: "12px", fontWeight: "bold", color: "#aaa" }}>
          ASSESSMENTS
        </div>

        <Link
          href="/teacher/dashboard/assessments"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          📈 All Assessments
        </Link>

        <Link
          href="/teacher/dashboard/assessments/math"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            marginLeft: "8px",
            fontSize: "14px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          📊 Math
        </Link>

        <Link
          href="/teacher/dashboard/assessments/math/upload"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            marginLeft: "16px",
            fontSize: "13px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          📤 Upload Math
        </Link>

        <Link
          href="/teacher/dashboard/assessments/reading"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            marginLeft: "8px",
            fontSize: "14px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          📚 Reading
        </Link>

        <Link
          href="/teacher/dashboard/assessments/science"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            marginLeft: "8px",
            fontSize: "14px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          🔬 Science
        </Link>

        <div style={{ marginTop: "20px", fontSize: "12px", fontWeight: "bold", color: "#aaa" }}>
          STUDENTS
        </div>

        <Link
          href="/teacher/dashboard/student"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          👥 Student Roster
        </Link>

        <div style={{ marginTop: "20px", fontSize: "12px", fontWeight: "bold", color: "#aaa" }}>
          TOOLS
        </div>

        <Link
          href="/"
          style={{
            padding: "12px 16px",
            backgroundColor: "#0f3460",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16213e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0f3460")
          }
        >
          🏠 Home
        </Link>
      </nav>
    </aside>
  );
}
