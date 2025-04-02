# 1️⃣ Create a Feature Branch from dev
git checkout dev  # Switch to dev branch
git pull origin dev  # Ensure it's up to date
git checkout -b feature/navbar  # Create a new branch for the navbar

# 2️⃣ Build the Navbar, Commit and Push Changes
git add .  # Stage all changes
git commit -m "✨ Added responsive navbar"  # Commit changes
git push -u origin feature/navbar  # Push to GitHub

# 3️⃣ Create a Pull Request (PR) on GitHub
# - Go to GitHub → Pull Requests → New Pull Request
# - Base: dev, Compare: feature/navbar
# - Add description & Create PR
# - Merge into dev after review

# 4️⃣ Merge dev → staging for Testing
git checkout staging  # Switch to staging
git pull origin staging  # Ensure it's up to date
git merge dev  # Merge dev into staging
git push origin staging  # Push to GitHub

# 5️⃣ Final Approval & Merge staging → main
git checkout main  # Switch to main
git pull origin main  # Ensure it's up to date
git merge staging  # Merge staging into main
git push origin main  # Push to GitHub

# ✅ Navbar is now live in production!
