<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240129162636 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE store ADD company_id INT NOT NULL');
        $this->addSql('ALTER TABLE store ADD CONSTRAINT FK_FF575877979B1AD6 FOREIGN KEY (company_id) REFERENCES companie (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_FF575877979B1AD6 ON store (company_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE store DROP CONSTRAINT FK_FF575877979B1AD6');
        $this->addSql('DROP INDEX IDX_FF575877979B1AD6');
        $this->addSql('ALTER TABLE store DROP company_id');
    }
}
