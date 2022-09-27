<?php

namespace App\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ApiCsrfValidationSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest'
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if(!$event->isMainRequest()) {
            return;
        }

        $request = $event->getRequest();

        if ($request->isMethodSafe()) {
            return;
        }

        if (!$request->attributes->get('_is_api')) {
            return;
        }

        if ($request->headers->get('Content-Type') !== 'application/json') {
            $response = new JsonResponse([
                'message' => 'Invalid Content-Type',
                'code' => 415
            ], 415);

            $event->setResponse($response);
        }
    }
}