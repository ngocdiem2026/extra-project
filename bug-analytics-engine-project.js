class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class Issue {
    constructor({ id, title, priority = 'Low', status = 'Open' }) {
        // TODO: (1) Thực hiện validate priority tại đây
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.status = status;
        this.createdAt = new Date();
    }
}

class Bug extends Issue {
    constructor(data) {
        super(data);
        this.severity = data.severity || 'S3';
    }
}

class IssueEngine {
    #issues = [];

    addIssues(rawArray) {
        // TODO: (2) 1. Làm phẳng mảng 2. Lọc rác 3. Map sang Class Instance
    }

    getDeepStats() {
        // TODO: (3)Sử dụng 1 lần reduce() để tính toán stats
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
//todo: (4) -> DienNguyen.
async function uploadWithRetry(issue, maxRetries = 3) {
    // if (!Number.isInteger(maxRetries) || maxRetries < 1) {
    //     throw new Error(`Invalid maxRetries: "${maxRetries}". Must be an integer greater than 0.`);

    // To prevent a loop with a logic error, the value of maxRetries should be verified. maxRetries must be an integer greater than 0.
    if (!Number.isInteger(maxRetries)) {
        throw new Error(`Invalid maxRetries: "${maxRetries}". Must be an integer.`);
    }
    if (maxRetries < 1) {
        throw new Error(`Invalid maxRetries: "${maxRetries}". Must be greater than 0.`);
    }
}
for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        const result = await simulateApiCall();
        //issue is defined but not used. It should be used in logs or return messages, such as "Attempt ${attempt}: Upload for issue ${issue.id} succeeded."
        console.log(`[Attempt ${attempt}] Upload succeeded.`);
        return result;
    } catch (err) {
        //issue is defined but not used. It should be used in logs or return messages, such as "Attempt ${attempt}: Upload for issue ${issue.id} succeeded."
        console.warn(`[Attempt ${attempt}] Failed — ${err}`);
        if (attempt === maxRetries) {
            //issue is defined but not used. It should be used in logs or return messages, such as "Attempt ${attempt}: Upload for issue ${issue.id} succeeded."
            throw new Error(`Upload failed after ${maxRetries} retries. Last error: ${err}`);
        }
        const waitTime = attempt * 1000;
        //issue is defined but not used. It should be used in logs or return messages, such as "Attempt ${attempt}: Upload for issue ${issue.id} succeeded."
        console.log(`Retrying in ${waitTime / 1000}s...`);
        await new Promise(res => setTimeout(res, waitTime));
    }
}


// Hàm giả lập API (KHÔNG SỬA HÀM NÀY)
function simulateApiCall() {
    return new Promise((res, rej) => Math.random() > 0.5 ? res("Success") : rej("Network Timeout"));
}

// --- KỊCH BẢN TEST ---
async function runDemo() {
    const engine = new IssueEngine();
    const messyData = [
        { id: 'B-01', title: 'UI Lag', priority: 'High', type: 'bug' },
        [
            { id: 'F-02', title: 'Bio-login', priority: 'Medium', type: 'feature' },
            { id: 'B-03', title: 'Critical Crash', priority: 'High', type: 'bug' }
        ]
    ];

    try {
        console.log("--- 1. Processing Data ---");
        engine.addIssues(messyData);

        console.log("--- 2. Deep Analytics ---");
        console.log(engine.getDeepStats());

        console.log("--- 3. Resilient Sync ---");
        // Lấy đại diện 1 issue để test retry
        const sampleIssue = new Issue({ id: 'TEST-01', title: 'Retry Test' });
        const result = await uploadWithRetry(sampleIssue, 3);
        console.log(result);

    } catch (err) {
        console.error("CRITICAL ERROR:", err.message);
    }
}

runDemo();