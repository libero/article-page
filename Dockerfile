#
# Stage: Base environment
#
FROM alpine:3.11.5 AS base
WORKDIR /app

COPY LICENSE.md .

HEALTHCHECK --interval=5s --timeout=1s \
    CMD true



#
# Stage: Development environment
#
FROM base AS dev

CMD ["sleep", "86400"]



#
# Stage: Production environment
#
FROM base AS prod
ARG image_tag

USER nobody

LABEL org.opencontainers.image.revision=${image_tag} \
    org.opencontainers.image.source=https://github.com/libero/article-page

CMD ["sleep", "86400"]
