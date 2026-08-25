import os
import random
import time
from datetime import datetime

from dotenv import load_dotenv
from sqlalchemy import create_engine, text


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)


def run_job():
    started_at = datetime.now()
    job_id = None

    try:
        with engine.begin() as connection:
            result = connection.execute(
                text("""
                    INSERT INTO job_runs (started_at, status, message)
                    VALUES (:started_at, :status, :message)
                    RETURNING id
                """),
                {
                    "started_at": started_at,
                    "status": "running",
                    "message": "Job started"
                }
            )

            job_id = result.scalar_one()

        random_number = random.randint(1, 100)
        message = f"Generated number: {random_number}"

        finished_at = datetime.now()

        with engine.begin() as connection:
            connection.execute(
                text("""
                    UPDATE job_runs
                    SET status = :status,
                        message = :message,
                        finished_at = :finished_at
                    WHERE id = :job_id
                """),
                {
                    "status": "success",
                    "message": message,
                    "finished_at": finished_at,
                    "job_id": job_id
                }
            )
        print(message, flush=True)
        ##print(message)

    except Exception as error:
        finished_at = datetime.now()

        if job_id is not None:
            with engine.begin() as connection:
                connection.execute(
                    text("""
                        UPDATE job_runs
                        SET status = :status,
                            message = :message,
                            finished_at = :finished_at
                        WHERE id = :job_id
                    """),
                    {
                        "status": "failed",
                        "message": str(error),
                        "finished_at": finished_at,
                        "job_id": job_id
                    }
                )
        print(f"Job failed: {error}", flush=True)
        #print(f"Job failed: {error}")


if __name__ == "__main__":
    while True:
        run_job()
        time.sleep(300)