# Deployment to GitHub Pages

## Quick Deploy

To deploy the app to GitHub Pages, run:

```bash
npm run deploy
```

This will:
1. Build the production version (`npm run build`)
2. Push the `dist/` folder to the `gh-pages` branch
3. Deploy to https://katebennu.github.io/baby-growth-estimator

## First-Time Setup

If this is your first deployment, you need to:

1. **Make sure you have a GitHub repository**:
   ```bash
   git remote -v
   # Should show: https://github.com/katebennu/baby-growth-estimator
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add React refactor and GitHub Pages deployment"
   git push origin main
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages in your repository settings**:
   - Go to https://github.com/katebennu/baby-growth-estimator/settings/pages
   - Under "Source", select the `gh-pages` branch
   - Click "Save"
   - Your site will be live at https://katebennu.github.io/baby-growth-estimator

## Configuration

The deployment is configured in:

- **package.json**:
  - `homepage`: Sets the base URL for the app
  - `predeploy`: Runs before deployment (builds the app)
  - `deploy`: Pushes the `dist/` folder to `gh-pages` branch

- **vite.config.js**:
  - `base`: Sets the base path for assets (must match the repo name)

## Troubleshooting

### Assets not loading (404 errors)
Make sure the `base` in `vite.config.js` matches your repository name:
```javascript
base: '/baby-growth-estimator/',  // Should match your repo name
```

### Page not updating
Clear your browser cache or do a hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Build fails
Run `npm run build` locally to check for errors before deploying

## Development vs Production

- **Development**: `npm run dev` - Assets loaded from `/`
- **Production**: `npm run deploy` - Assets loaded from `/baby-growth-estimator/`

The Vite config handles this automatically.
