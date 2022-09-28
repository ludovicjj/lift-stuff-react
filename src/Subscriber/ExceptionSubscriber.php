<?php

namespace App\Subscriber;

use App\Exception\ValidationException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class ExceptionSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException', 2]
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        if (str_starts_with($event->getRequest()->getRequestUri(), "/api/reps")) {
            $this->sendJsonResponseException($event);
        }
    }

    public function sendJsonResponseException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $statusCode = $exception->getCode() ?: 400;
        $data = [
            'message'   => $exception->getMessage(),
            'code'      => $statusCode
        ];

        if ($exception instanceof ValidationException) {
            $data['errors'] = $exception->getErrors();
        }

        $event->setResponse(new JsonResponse($data, $statusCode));
    }
}