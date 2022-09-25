<?php

namespace App\Repository;

use App\Entity\RepLog;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RepLog>
 *
 * @method RepLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method RepLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method RepLog[]    findAll()
 * @method RepLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RepLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RepLog::class);
    }

    public function add(RepLog $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(RepLog $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getLeadBoardDetails()
    {
        return $this->createQueryBuilder('rl')
            ->select('IDENTITY(rl.user) as user_id, SUM(rl.totalWeightLifted) as weight_sum, u.email as user_email')
            ->innerJoin(User::class, 'u', Join::WITH, 'u.id = user_id')
            ->groupBy('user_id')
            ->orderBy('weight_sum', 'DESC')
            ->getQuery()
            ->execute();
    }

    public function getAllRepLogPaginated($user, $page, $limit): Paginator
    {
        $offset = ($page - 1) * $limit;
        $queryBuilder = $this->createQueryBuilder('rl')
            ->andWhere('rl.user = :user')
            ->setParameter('user', $user)
            ->orderBy('rl.id', 'ASC')
            ->setFirstResult($offset)
            ->setMaxResults($limit);
        return new Paginator($queryBuilder);
    }

//    /**
//     * @return RepLog[] Returns an array of RepLog objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?RepLog
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
