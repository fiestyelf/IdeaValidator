# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please do not open a public issue. Instead, report it to the security developer or maintainers.

## Security Developer Role

The **Security Developer** role is responsible for:
- Implementing secure environment variable management (e.g., Varlock/`.env.schema`).
- Regular dependency scanning and security audits.
- Hardening CI/CD pipelines.
- Ensuring compliance with modern security standards (OWASP, etc.).

## Security Tools Used

- **Varlock**: Secure environment variable management.
- **Security Auditor Skill**: Professional-grade security oversight and auditing.
- **Standardized Schema**: Validating environment variables via `.env.schema`.

## Repository Hardening

- `.env` is ignored by git.
- `.env.example` provides a template for required secrets.
- `.env.schema` enforces type-safe and masked secret handling.
