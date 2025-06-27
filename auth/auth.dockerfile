FROM python:latest

WORKDIR /app

COPY requirements.txt /app/
COPY .env /app/
COPY . /app/

RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https \
    && curl https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc \
    && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/opt/mssql-tools18/bin"

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8084"]