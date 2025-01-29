# 🚀 Contribution Guidelines

Thank you for contributing to the **Club Event Hub** project! 🎉  
This guide outlines the **workflow, coding standards, and PR process** for all contributors.

---

## **✅ 1️⃣ Git Branching Strategy**
We use a structured **Git branching model** to keep development organized.  

### **📌 Main Branches**
| **Branch** | **Purpose** | **Who Can Push?** |
|-----------|------------|----------------|
| `main` | Production-ready code | **Only Admins** (PR required) |
| `dev` | Active development branch | **All Contributors** |

### **📌 Feature & Bugfix Branches**
| **Branch Naming Convention** | **Purpose** |
|-----------------------------|------------|
| `feature/<feature-name>` | Adding a new feature |
| `bugfix/<bug-description>` | Fixing a bug |
| `hotfix/<critical-fix>` | Urgent production fixes |

✅ **Example Branch Names**
```bash
feature/add-comment-system
bugfix/fix-rsvp-button
hotfix/security-patch
```
---

## **✅ 2️⃣ How to Contribute (Step-by-Step)**
1️⃣ Pull the Latest Code:
- Before making changes, always pull the latest code from dev:
```bash
git checkout dev
git pull origin dev
```
2️⃣ Create a New Branch
- Create a branch for your feature or bugfix:
```bash
git checkout -b feature/add-event-filter
```
3️⃣ Make Your Changes

4️⃣ Commit Changes with Clear Messages
```bash
git add .
git commit -m "✨ Added event filtering feature"
```

5️⃣ Push Your Branch to GitHub
```bash
git push origin feature/add-event-filter
```

6️⃣ Open a Pull Request (PR)
1. Go to the GitHub repository.
2. Click "New Pull Request".
3. Select "dev" as the base branch and your feature branch as the compare branch.
4. Add a title & description for your PR.
5. Request a code review from at least one team member.

7️⃣ Get PR Approved & Merge
- project leader will approve the PR if it meets project standards.
- Once approved, merge the PR into dev.
- DO NOT MERGE TO main DIRECTLY. Project leader will test code in dev before merging to main.

---

## **✅ 3️⃣ Code Style & Standards**

- Component Naming: PascalCase
- File Naming: camelCase.js
- Keep CSS inside Tailwind classes unless necessary.

```js
const EventCard = ({ title, date }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{date}</p>
    </div>
  );
};

export default EventCard;
```

