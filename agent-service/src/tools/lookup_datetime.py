from livekit.agents import function_tool, RunContext
import datetime
import random
import logging

logger = logging.getLogger("lookup_datetime")

@function_tool()
async def lookup_datetime(
    context: RunContext,
) -> dict:
    """Look up the current date/time and return a random value between 0 and 10."""
    
    logger.info("lookup_datetime tool invoked.")

    now = datetime.datetime.now().isoformat()
    random_value = random.randint(0, 10)

    logger.debug(f"Generated datetime: {now}")
    logger.debug(f"Generated random value: {random_value}")

    result = {
        "datetime": now,
        "random_value": random_value
    }

    logger.info(f"lookup_datetime result: {result}")

    return result
