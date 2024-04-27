revision_message=$1

docker exec -it ${CONTAINER_NAME_API} poetry run alembic revision --autogenerate -m ${revision_message}
docker exec -it ${CONTAINER_NAME_API} poetry run alembic upgrade head
