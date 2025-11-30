# GitHub Pages Deployment Guide

## Why GitHub Pages Shows README Instead of React App

GitHub Pages by default shows your README.md file if no `index.html` is found in the root. React apps need to be built first, and the build folder needs to be deployed.

## Solution: Deploy Your React App to GitHub Pages

### Method 1: Using GitHub Actions (Recommended - Automatic)

1. **Update the homepage in package.json:**
   - Replace `YOUR_USERNAME` with your GitHub username in `package.json`
   - Example: `"homepage": "https://yourusername.github.io/ReactUI"`

2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Actions:**
   - Go to your repository on GitHub
   - Click on "Actions" tab
   - The workflow will automatically run on push
   - Wait for it to complete (check the green checkmark)

4. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Your site will be available at: `https://yourusername.github.io/ReactUI`

### Method 2: Manual Deployment (Alternative)

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json homepage:**
   - Replace `YOUR_USERNAME` with your GitHub username

3. **Build and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Under "Source", select "gh-pages" branch
   - Your site will be available at: `https://yourusername.github.io/ReactUI`

## Important Notes

- **HashRouter**: The app now uses `HashRouter` instead of `BrowserRouter` for better GitHub Pages compatibility
- **Build Required**: Always run `npm run build` before deploying
- **Repository Name**: Make sure the repository name matches in the homepage URL

## Troubleshooting

- **404 Errors**: Make sure you're using HashRouter (already configured)
- **Blank Page**: Check browser console for errors
- **Styles Not Loading**: Ensure all paths in CSS are relative
- **Routes Not Working**: HashRouter handles this automatically with `#` in URLs

## Your Live URL Format

- If repository is `ReactUI`: `https://yourusername.github.io/ReactUI`
- If repository is root: `https://yourusername.github.io`

