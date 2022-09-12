<?php

namespace App\Entity;

use App\Repository\RepLogRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

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
    #[
        Assert\NotBlank(message: "how many times did you lift this ?"),
        Assert\GreaterThan(value: 0, message: "You can certainly lift more than just 0 !")
    ]
    #[Groups(['add_rep_log'])]
    private ?int $reps = null;

    #[ORM\Column(length: 50)]
    #[
        Assert\NotBlank(message: "What did you lift ?"),
        Assert\Choice(callback: "getAllowedLiftItems")
    ]
    #[Groups(['add_rep_log'])]
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

    public function getItemLabel(): string
    {
        if (!$this->getItem()) {
            throw new \LogicException('Item cannot be null');
        }

        return ucwords(str_replace('_', ' ', $this->getItem()));
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

    public static function getAllowedLiftItems(): array
    {
        return array_keys(self::ALLOWED_LIFT_ITEMS);
    }

    /** Used for choice value into RepLopType  */
    public static function getLiftedItemChoices(): array
    {
        $items = array_keys(self::ALLOWED_LIFT_ITEMS);
        $choices = [];
        foreach($items as $item) {
            $choices[str_replace('_', ' ', $item)] = $item;
        }
        return $choices;
    }
}
