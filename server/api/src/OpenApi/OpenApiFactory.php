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

        $resendEmail = new Model\PathItem(
            post: new Model\Operation(
                operationId: 'resendEmail',
                tags: ['Confirm Email'],
                summary: 'Resend email confirmation',
                description: 'Resend email confirmation',
                requestBody: new Model\RequestBody(
                    description: 'The email to resend the confirmation',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'email' => [
                                        'type' => 'string',
                                        'description' => 'The email to resend the confirmation',
                                    ],
                                ],
                            ],
                        ],
                    ]),
                ),
                responses: [
                    '200' => [
                        'description' => 'Email confirmation sent',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => [
                                            'type' => 'string',
                                            'description' => 'Email confirmation sent',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    '400' => [
                        'description' => 'Invalid email',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => [
                                            'type' => 'string',
                                            'description' => 'Invalid email',
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

        $dashboardStats = new Model\PathItem(
            get: new Model\Operation(
                operationId: 'getStats',
                tags: ['Dashboard'],
                summary: 'Get the stats of the dashboard',
                description: 'Get the stats of the dashboard',
                responses: [
                    '200' => [
                        'description' => 'The stats of the dashboard',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'total_bookings_today' => [
                                            'type' => 'integer',
                                            'description' => 'The total bookings of today',
                                        ],
                                        'total_bookings_last_day' => [
                                            'type' => 'integer',
                                            'description' => 'The total bookings of the last day',
                                        ],
                                        'total_bookings_month' => [
                                            'type' => 'integer',
                                            'description' => 'The total bookings of the month',
                                        ],
                                        'total_bookings_from_beginning' => [
                                            'type' => 'integer',
                                            'description' => 'The total bookings from the beginning',
                                        ],
                                        'total_benefits' => [
                                            'type' => 'number',
                                            'description' => 'The total benefits of today',
                                        ],
                                        'total_benefits_last_day' => [
                                            'type' => 'number',
                                            'description' => 'The total benefits of the last day',
                                        ],
                                        'total_benefits_month' => [
                                            'type' => 'number',
                                            'description' => 'The total benefits of the month',
                                        ],
                                        'total_benefits_from_beginning' => [
                                            'type' => 'number',
                                            'description' => 'The total benefits from the beginning',
                                        ],
                                        'total_cancelled_bookings_today' => [
                                            'type' => 'integer',
                                            'description' => 'The total cancelled bookings of today',
                                        ],
                                        'total_cancelled_bookings_last_day' => [
                                            'type' => 'integer',
                                            'description' => 'The total cancelled bookings of the last day',
                                        ],
                                        'total_cancelled_bookings_month' => [
                                            'type' => 'integer',
                                            'description' => 'The total cancelled bookings of the month',
                                        ],
                                        'total_cancelled_bookings_from_beginning' => [
                                            'type' => 'integer',
                                            'description' => 'The total cancelled bookings from the beginning',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    '403' => [
                        'description' => 'You are not allowed to access this page',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => [
                                            'type' => 'string',
                                            'description' => 'You are not allowed to access this page',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        );

        $openApi->getPaths()->addPath('/dashboard/stats', $dashboardStats);

        $openApi->getPaths()->addPath('/users/token/{token}', $pathItem);
        
        $openApi->getPaths()->addPath('/users/resend-email', $resendEmail);
        return $openApi;
    }
}