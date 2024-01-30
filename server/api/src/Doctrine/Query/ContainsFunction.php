<?php

namespace App\Doctrine\Query;

use Doctrine\ORM\Query\AST\Functions\FunctionNode;
use Doctrine\ORM\Query\Lexer;

class ContainsFunction extends FunctionNode
{
    public $jsonExpression = null;
    public $value = null;

    public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
    {
        // Cast the jsonExpression and value to JSONB
        $jsonExpression = $this->jsonExpression->dispatch($sqlWalker) . '::jsonb';
        $value = $this->value->dispatch($sqlWalker) . '::jsonb';

        return "({$jsonExpression} @> {$value})";
    }

    public function parse(\Doctrine\ORM\Query\Parser $parser)
    {
        $parser->match(Lexer::T_IDENTIFIER);
        $parser->match(Lexer::T_OPEN_PARENTHESIS);

        $this->jsonExpression = $parser->ArithmeticPrimary();
        $parser->match(Lexer::T_COMMA);

        $this->value = $parser->ArithmeticPrimary();

        $parser->match(Lexer::T_CLOSE_PARENTHESIS);
    }
}
