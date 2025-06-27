FROM python:3.12-slim

WORKDIR /app

# Instala dependências do sistema para compilar psycopg2-binary
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

RUN pip install python-dotenv

COPY requirements.txt /app/
COPY .env /app/
COPY . /app/

RUN pip install --no-cache-dir -r requirements.txt \
    --index-url https://pypi.tuna.tsinghua.edu.cn/simple \
    --trusted-host pypi.tuna.tsinghua.edu.cn

RUN useradd -m devuser && \
    chown -R devuser:devuser /app && \
    chmod 644 /app/.env

USER devuser

COPY . .

ENV PYTHONPATH=/app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8084 --reload", "--reload-dir", "/app"]