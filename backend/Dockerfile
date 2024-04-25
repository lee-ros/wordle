FROM python:3.10-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ARG ENV_TYPE

WORKDIR /app
COPY ./pyproject.toml ./poetry.lock ./

RUN pip install poetry
RUN poetry install
RUN if [ "${ENV_TYPE}" = "dev" ] ; then poetry install --only dev ; fi

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]