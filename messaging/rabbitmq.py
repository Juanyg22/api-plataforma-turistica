import json

import pika


RABBITMQ_HOST = "localhost"
EXCHANGE_NAME = "turismo.events"
QUEUE_NAME = "hotel.deactivated"
ROUTING_KEY = "hotel.deactivated"


def get_connection():
    parameters = pika.ConnectionParameters(
        host=RABBITMQ_HOST
    )

    return pika.BlockingConnection(parameters)


def configurar_canal(channel):
    channel.exchange_declare(
        exchange=EXCHANGE_NAME,
        exchange_type="topic",
        durable=True
    )

    channel.queue_declare(
        queue=QUEUE_NAME,
        durable=True
    )

    channel.queue_bind(
        exchange=EXCHANGE_NAME,
        queue=QUEUE_NAME,
        routing_key=ROUTING_KEY
    )


def publicar_evento(evento: dict):
    connection = get_connection()

    try:
        channel = connection.channel()

        configurar_canal(channel)

        mensaje = json.dumps(
            evento,
            ensure_ascii=False
        )

        channel.basic_publish(
            exchange=EXCHANGE_NAME,
            routing_key=ROUTING_KEY,
            body=mensaje,
            properties=pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2
            )
        )

        print(
            f"Evento publicado: {evento['event']}"
        )

    finally:
        if connection.is_open:
            connection.close()