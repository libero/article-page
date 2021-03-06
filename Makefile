.DEFAULT_GOAL = help
.PHONY: help install gitmodules build start stop wait-healthy sh exec logs watch lint* test* run dev prod

SHELL = /usr/bin/env bash

ifneq (${TARGET}, prod)
TARGET = dev
endif

DOCKER_COMPOSE = docker-compose --file .docker/docker-compose.yml --file .docker/docker-compose.${TARGET}.yml

STOP = exit=$$?; $(MAKE) stop; exit $$exit

export IMAGE_TAG
export TARGET

help: ## Display this help text
	@grep -E '^[a-zA-Z_\\:-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | sed 's/\\:/:/g' | awk 'BEGIN {FS = ":[^:]*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: node_modules gitmodules ## Install dependencies locally

node_modules: package.json package-lock.json
	npm install
	touch node_modules

gitmodules:
	git submodule update --init --recursive

build: ## Build the app container
	${DOCKER_COMPOSE} build app

start: ## Start the containers
	${DOCKER_COMPOSE} up --detach

stop: ## Stop the containers
	${DOCKER_COMPOSE} down

wait-healthy: ## Wait for the containers to be healthy
	@services=($$(${DOCKER_COMPOSE} ps --quiet)); \
	if [ $${#services[@]} -eq 0 ]; then \
		echo "No containers running"; \
		exit 1; \
	fi; \
	for service in $${services[@]}; do \
		.scripts/docker/wait-healthy.sh "$${service}"; \
	done

sh: ## Open a shell on the app container
	$(MAKE) exec command="sh"

tty = 1
exec: ## Run a command on the app container
	@if [ -z "$(command)" ]; then \
		echo "No command provided"; \
		exit 1; \
	fi;
	${DOCKER_COMPOSE} exec $(if $(tty),,-T) app $(command)

logs: ## Show the containers' logs
	${DOCKER_COMPOSE} logs

watch: ## Follow the containers' logs
	${DOCKER_COMPOSE} logs --follow

lint: export TARGET = dev
lint: ## Lint the code
	${DOCKER_COMPOSE} run --rm app npm run lint

lint\:fix: export TARGET = dev
lint\:fix: ## Fix linting issues in the code
	${DOCKER_COMPOSE} run --rm app npm run lint:fix

test: export TARGET = dev
test: ## Run the tests
	${DOCKER_COMPOSE} run --rm app npm run test

test\:mutation: export TARGET = dev
test\:mutation: ## Run the mutation tests
	${DOCKER_COMPOSE} run --rm app npm run test:mutation; ${STOP}

run:
	${DOCKER_COMPOSE} up --abort-on-container-exit --exit-code-from app; ${STOP}

dev: export TARGET = dev
dev: ## Build and runs the container for development
	$(MAKE) --jobs=4 install build stop
	$(MAKE) run

prod: export TARGET = prod
prod: ## Builds and runs the container for production
	$(MAKE) --jobs=2 build stop
	$(MAKE) run
