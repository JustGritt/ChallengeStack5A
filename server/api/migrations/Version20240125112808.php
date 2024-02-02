<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240125112808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE companie (id INT NOT NULL, name VARCHAR(255) NOT NULL, kbis VARCHAR(255) NOT NULL, is_valid BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE store (id INT NOT NULL, companie_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, postal_code VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FF5758779DC4CE1F ON store (companie_id)');
        $this->addSql('ALTER TABLE store ADD CONSTRAINT FK_FF5758779DC4CE1F FOREIGN KEY (companie_id) REFERENCES companie (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE store DROP CONSTRAINT FK_FF5758779DC4CE1F');
        $this->addSql('DROP TABLE companie');
        $this->addSql('DROP TABLE store');
    }
}
