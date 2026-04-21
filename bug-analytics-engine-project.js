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
// TODO:(4) -> DienNguyen.
async function uploadWithRetry(issue, maxRetries = 3) {
    if (!Number.isInteger(maxRetries) || maxRetries < 1) {
        throw new Error(`Invalid maxRetries: "${maxRetries}". Must be an integer greater than 0.`);

    }
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await simulateApiCall();
            console.log(`[Attempt ${attempt}] Upload for issue ${issue.id} succeeded.`);
            return result;
        } catch (err) {
            console.warn(`[Attempt ${attempt}] Upload for issue ${issue.id} failed — ${err}`);
            if (attempt === maxRetries) {
                throw new Error(`Upload for issue ${issue.id} failed after ${maxRetries} retries. Last error: ${err}`);
            }
            const waitTime = attempt * 1000;
            //
            console.log(`Retrying in ${waitTime / 1000}s...`);
            await new Promise(res => setTimeout(res, waitTime));
        }
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