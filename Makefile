.PHONY: help dev db-setup format format-check type-check

help:
	@echo "Compliance Hub - Commands:"
	@echo "  make dev          - Desarrollo (API + Web)"
	@echo "  make db-setup     - Setup DB"
	@echo "  make format       - Formatear código"
	@echo "  make format-check - Verificar formato"
	@echo "  make type-check   - Verificar tipos TypeScript"

dev:
	pnpm dev

db-setup:
	pnpm db:push && pnpm db:seed

format:
	npx prettier --write "apps/*/src/**/*.{ts,tsx}"

format-check:
	npx prettier --check "apps/*/src/**/*.{ts,tsx}"

type-check:
	cd apps/api && npx tsc --noEmit
	cd apps/web && npx tsc --noEmit
