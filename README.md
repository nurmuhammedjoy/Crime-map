   ```

3. **Make your changes** — write clean, readable code and follow the existing code style.
4. **Test your changes** — make sure the app builds and runs correctly:

   ```bash
   npm run build
   npm run lint
   ```

5. **Commit your changes** with a clear, descriptive message:

   ```bash
   git commit -m "feat: add description of your change"
   ```

6. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** against the `main` branch of this repository.

### Contribution Guidelines

- **Code Style:** Follow the existing TypeScript and React patterns used in the project. Run `npm run lint` before submitting.
- **Commits:** Use clear, descriptive commit messages. We recommend [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `docs:`, `refactor:`).
- **Branch Naming:** Use descriptive branch names like `feature/add-heatmap`, `fix/marker-click-bug`, or `docs/update-readme`.
- **Pull Requests:** Provide a clear description of what your PR does and why. Reference any related issues.
- **Issues First:** For major changes, please [open an issue](https://github.com/nurmuhammedjoy/Crime-map/issues) first to discuss what you would like to change.
- **Be Respectful:** Follow the code of conduct and be kind to other contributors.

### Ideas for Contributions

- 🐛 Bug fixes
- ✨ New features (e.g., crime filtering, heatmap layers, search functionality)
- 📖 Documentation improvements
- ♿ Accessibility enhancements
- 🧪 Adding tests
- 🎨 UI/UX improvements

## 📂 Project Structure

```
Crime-map/
├── src/               # Application source code
├── package.json       # Dependencies and scripts
├── next.config.ts     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
├── eslint.config.mjs  # ESLint configuration
├── postcss.config.mjs # PostCSS configuration
├── components.json    # shadcn/ui component configuration
└── README.md          # Project documentation
```

## 📄 License

This project is open source. Please check back for license details.

---

Made with ❤️ by [@nurmuhammedjoy](https://github.com/nurmuhammedjoy)
