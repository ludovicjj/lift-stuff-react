<?php

namespace App\Service;

use App\Exception\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

class ErrorValidationFactory
{
    public static function handleErrors(ConstraintViolationListInterface $constraintList)
    {
        if (count($constraintList) > 0) {
            $errors = [];
            /** @var ConstraintViolationInterface $constraint */
            foreach ($constraintList as $constraint) {
                $errors[] = [
                    'property' => $constraint->getPropertyPath(),
                    'message' => $constraint->getMessage()
                ];
            }

            throw new ValidationException(
                $errors,
                'unprocessable entity',
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
    }
}