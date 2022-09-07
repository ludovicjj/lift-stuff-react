<?php

namespace App\Listener;

use App\Entity\RepLog;
use LogicException;

class RepLogListener
{
    public function prePersist(RepLog $repLog): void
    {
        if (
            !$repLog->getItem() ||
            !$repLog->getReps() ||
            !array_key_exists($repLog->getItem(), RepLog::ALLOWED_LIFT_ITEMS)
        )
        {
            throw new LogicException("Unable to set total weights lifted with the values given for item or reps");
        }

        // Calcul total weight for the given item and how many reps
        $weight = RepLog::ALLOWED_LIFT_ITEMS[$repLog->getItem()];
        $totalWeight = $repLog->getReps() * $weight;
        $repLog->setTotalWeightLifted($totalWeight);
    }
}