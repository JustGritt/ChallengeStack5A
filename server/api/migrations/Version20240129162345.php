<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240129162345 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE store DROP CONSTRAINT fk_ff5758779dc4ce1f');
        $this->addSql('DROP INDEX idx_ff5758779dc4ce1f');
        $this->addSql('ALTER TABLE store DROP companie_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE store ADD companie_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE store ADD CONSTRAINT fk_ff5758779dc4ce1f FOREIGN KEY (companie_id) REFERENCES companie (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_ff5758779dc4ce1f ON store (companie_id)');
    }
}
