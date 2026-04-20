class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Issue {
  constructor({ id, title, priority = "Low", status = "Open" }) {
    // TODO: (1) Thực hiện validate priority tại đây
    const validPriorities = ["High", "Medium", "Low"];

    // ❗ validate tại đây
    if (!validPriorities.includes(priority)) {
      throw new ValidationError(
        `Invalid priority: ${priority}. Allowed priority values are: High, Medium, Low.`,
      );
    }
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.status = status;
    this.createdAt = new Date();
  }
}

// we can test by the coding below for todo01
// try {
//     const issue1 = new Issue({
//         id: 1,
//         title: "Fix bug login",
//         priority: "High"
//     });

//     console.log("OK:", issue1);

//     const issue2 = new Issue({
//         id: 2,
//         title: "Fix UI",
//         priority: "Urgent" // lỗi vì không hợp lệ
//     });

// } catch (err) {
//     if (err instanceof ValidationError) {
//         console.log("Validation Error:", err.message);
//     } else {
//         console.log("Other Error:", err);
//     }
// }

class Bug extends Issue {
  constructor(data) {
    super(data);
    this.severity = data.severity || "S3";
  }
}

class IssueEngine {
  #issues = [];

  addIssues(rawArray) {
    // TODO: (2)
    // 1. Làm phẳng mảng
    const flatData = rawArray.flat(Infinity);
    // 2. Lọc rác
    const validData = flatData.filter((item) => item?.id && item?.title);
    // 3. Map sang Class Instance
    const instances = validData.map((item) => {
      if (item.type === "bug") {
        return new Bug(item);
      }
      return new Issue(item);
    });

    this.#issues.push(...instances);
  }

  getDeepStats() {
    // TODO: (3)Sử dụng 1 lần reduce() để tính toán stats
  }
  getAllIssues() {
    return this.#issues;
  }
}

/**
 * THỬ THÁCH: TỰ VIẾT HÀM RETRY
 * @param {Issue} issue - Đối tượng cần upload
 * @param {number} maxRetries - Số lần thử tối đa
 */
async function uploadWithRetry(issue, maxRetries = 3) {
  // TODO: (4)
  // 1. Sử dụng vòng lặp (for hoặc while) để giới hạn số lần thử.
  // 2. Bọc hàm simulateApiCall() trong khối try...catch.
  // 3. Nếu THÀNH CÔNG (try): return kết quả ngay lập tức.
  // 4. Nếu THẤT BẠI (catch):
  //    - Kiểm tra xem đã hết lượt retry chưa. Nếu hết, throw Error.
  //    - Nếu còn lượt, hãy tính toán waitTime = số_lần_thử * 1000ms.
  //    - Sử dụng await new Promise(res => setTimeout(res, waitTime)) để tạo khoảng nghỉ.
  // CODE CỦA BẠN DƯỚI ĐÂY:
}

// Hàm giả lập API (KHÔNG SỬA HÀM NÀY)
function simulateApiCall() {
  return new Promise((res, rej) =>
    Math.random() > 0.5 ? res("Success") : rej("Network Timeout"),
  );
}

// --- KỊCH BẢN TEST ---
async function runDemo() {
  const engine = new IssueEngine();
  const messyData = [
    { id: "B-01", title: "UI Lag", priority: "High", type: "bug" },
    [
      { id: "F-02", title: "Bio-login", priority: "Medium", type: "feature" },
      { id: "B-03", title: "Critical Crash", priority: "High", type: "bug" },
    ],
  ];

  try {
    console.log("--- 1. Processing Data ---");
    engine.addIssues(messyData);
    console.log(engine.getAllIssues());

    console.log("--- 2. Deep Analytics ---");
    console.log(engine.getDeepStats());

    console.log("--- 3. Resilient Sync ---");
    // Lấy đại diện 1 issue để test retry
    const sampleIssue = new Issue({ id: "TEST-01", title: "Retry Test" });
    const result = await uploadWithRetry(sampleIssue, 3);
    console.log(result);
  } catch (err) {
    console.error("CRITICAL ERROR:", err.message);
  }
}

runDemo();
