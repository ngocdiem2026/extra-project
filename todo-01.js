class ValidationError extends Error {
    constructor(message) {
        super(message); // gọi constructor của Error
        this.name = "ValidationError"; // đặt tên lỗi cho dễ debug
    }
}

class Issue {
    constructor({ id, title, priority = 'Low', status = 'Open' }) {
        const validPriorities = ['High', 'Medium', 'Low'];

        // ❗ validate tại đây
        if (!validPriorities.includes(priority)) {
            throw new ValidationError(`Invalid priority: ${priority}`);
        }

        this.id = id;
        this.title = title;
        this.priority = priority;
        this.status = status;
        this.createdAt = new Date();
    }
}

// Test
try {
    const issue1 = new Issue({
        id: 1,
        title: "Fix bug login",
        priority: "High"
    });

    console.log("OK:", issue1);

    const issue2 = new Issue({
        id: 2,
        title: "Fix UI",
        priority: "Urgent" // lỗi vì không hợp lệ
    });

} catch (err) {
    if (err instanceof ValidationError) {
        console.log("Validation Error:", err.message);
    } else {
        console.log("Other Error:", err);
    }
}