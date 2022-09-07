<?php

namespace App\Entity;

use App\Repository\RepLogRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RepLogRepository::class)]
class RepLog
{
    const ALLOWED_LIFT_ITEMS = [
        'cat' => '9',
        'laptop' => '4.5',
        'coffee_cup' => '.5',
        'fat_cat' => '18'
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $reps = null;

    #[ORM\Column(length: 50)]
    private ?string $item = null;

    #[ORM\Column]
    private ?float $totalWeightLifted = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReps(): ?int
    {
        return $this->reps;
    }

    public function setReps(int $reps): self
    {
        $this->reps = $reps;

        return $this;
    }

    public function getItem(): ?string
    {
        return $this->item;
    }

    public function setItem(string $item): self
    {
        $this->item = $item;

        return $this;
    }

    public function getTotalWeightLifted(): ?float
    {
        return $this->totalWeightLifted;
    }

    // the total weight lifted is defined by RepLogListener (event:prePersist)
    public function setTotalWeightLifted(float $totalWeightLifted): self
    {
        $this->totalWeightLifted = $totalWeightLifted;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser($user): self
    {
        $this->user = $user;

        return $this;
    }
}
