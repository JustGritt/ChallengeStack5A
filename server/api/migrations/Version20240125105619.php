<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240125105619 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE store DROP CONSTRAINT fk_ff575877b84bdd89');
        $this->addSql('DROP INDEX idx_ff575877b84bdd89');
        $this->addSql('ALTER TABLE store ADD companie_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE store DROP companie_id_id');
        $this->addSql('ALTER TABLE store ALTER postal_code TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE store ADD CONSTRAINT FK_FF5758779DC4CE1F FOREIGN KEY (companie_id) REFERENCES companie (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_FF5758779DC4CE1F ON store (companie_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE store DROP CONSTRAINT FK_FF5758779DC4CE1F');
        $this->addSql('DROP INDEX IDX_FF5758779DC4CE1F');
        $this->addSql('ALTER TABLE store ADD companie_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE store DROP companie_id');
        $this->addSql('ALTER TABLE store ALTER postal_code TYPE VARCHAR(50)');
        $this->addSql('ALTER TABLE store ADD CONSTRAINT fk_ff575877b84bdd89 FOREIGN KEY (companie_id_id) REFERENCES companie (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_ff575877b84bdd89 ON store (companie_id_id)');
    }
}
