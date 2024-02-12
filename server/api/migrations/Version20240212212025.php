<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240212212025 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_43348B035E237E06 ON companie (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_43348B037E3C61F9 ON companie (owner_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_43348B035E237E06');
        $this->addSql('DROP INDEX UNIQ_43348B037E3C61F9');
        $this->addSql('CREATE INDEX IDX_43348B037E3C61F9 ON companie (owner_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
    }
}
