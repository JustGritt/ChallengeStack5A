<?php
namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;

class OpenApiFactory implements OpenApiFactoryInterface
{

    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        //add my custom documentation for the route /users/token/{token}
        $pathItem = new Model\PathItem(
            get: new Model\Operation(
                operationId: 'getToken',
                tags: ['Confirm Email'],
                summary: 'Confirm email',
                description: 'Confirm email',
                parameters: [
                    new Model\Parameter(
                        name: 'token',
                        in: 'path',
                        required: true,
                        schema: [
                            'type' => 'string',
                            'description' => 'The confirmation token',
                        ],
                    ),
                ],
                responses: [
                    '200' => [
                        'description' => 'Token successfully created',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'token' => [
                                            'type' => 'string',
                                            'description' => 'The token',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    '400' => [
                        'description' => 'Invalid token',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => [
                                            'type' => 'string',
                                            'description' => 'Invalid token',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],

                    '403' => [
                        'description' => 'Email already confirmed',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => [
                                            'type' => 'string',
                                            'description' => 'Email already confirmed',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        );

        $openApi->getPaths()->addPath('/users/token/{token}', $pathItem);
        return $openApi;
    }
}