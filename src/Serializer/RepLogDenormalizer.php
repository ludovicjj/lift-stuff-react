<?php

namespace App\Serializer;

use App\Entity\RepLog;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\PropertyInfo\Extractor\SerializerExtractor;
use Symfony\Bridge\Doctrine\PropertyInfo\DoctrineExtractor;
use Symfony\Component\PropertyInfo\PropertyInfoExtractor;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class RepLogDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    private const ALREADY_CALLED = 'REP_LOG_DENORMALIZER_ALREADY_CALLED';

    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return RepLog::class === $type;
    }

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $context[self::ALREADY_CALLED] = true;
        $typeInfo = $this->getPropertiesWithTypeInfo($type, $context);
        $filteredData = $this->filterDataInput($data, $typeInfo);
        $data = $this->convertTypeOrUnset($filteredData, $typeInfo);

        return $this->denormalizer->denormalize($data, $type, $format, $context);
    }

    private function convertTypeOrUnset(array &$data, array $typeInfo): array
    {
        foreach ($data as $key => $value) {
            $isValidType = $this->isValidType($typeInfo[$key], $value);
            if (!$isValidType) {
                unset($data[$key]);
                continue;
            }
            settype($value, $typeInfo[$key]);
            $data[$key] = $value;
        }

        return $data;
    }

    private function isValidType(string $type, mixed $data):bool
    {
        return match ($type) {
            'string' => is_string($data),
            'int' => is_numeric($data),
            default => true,
        };
    }

    private function filterDataInput(array $data = [], array $properties = []): array
    {
        return array_filter($data, function($value, $key) use ($properties) {
            return $value !== '' && array_key_exists($key, $properties);
        }, ARRAY_FILTER_USE_BOTH);
    }

    private function getPropertiesWithTypeInfo(string $type, array $context): array
    {
        $properties = $this->getPropertiesToSerialize($type, $context);
        $propertyInfo = $this->getPropertyInfoExtractor();
        $propertiesTypeInfo = [];

        foreach ($properties as $property) {
            $propertiesTypeInfo[$property] = $propertyInfo->getTypes($type, $property)[0]->getBuiltinType();
        }

        return $propertiesTypeInfo;
    }

    private function getPropertiesToSerialize(string $type, array $context): ?array
    {
        $groups = $context['groups'] ?? null;
        $serializerClassMetadataFactory = new ClassMetadataFactory(
            new AnnotationLoader(new AnnotationReader)
        );
        $serializerExtractor = new SerializerExtractor($serializerClassMetadataFactory);

        return $serializerExtractor->getProperties($type, ['serializer_groups' => [$groups]]);
    }

    private function getPropertyInfoExtractor(): PropertyInfoExtractor
    {
        $doctrineExtractor = new DoctrineExtractor($this->entityManager);
        return new PropertyInfoExtractor(
            [$doctrineExtractor],
            [$doctrineExtractor]
        );
    }
}