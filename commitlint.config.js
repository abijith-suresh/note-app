export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "refactor", "chore", "test", "ci", "build"]],
    "header-max-length": [2, "always", 72],
    "subject-full-stop": [2, "never", "."],
  },
};
