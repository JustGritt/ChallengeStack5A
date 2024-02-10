<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240209191013 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE companie ADD rcs VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD capital INT DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD adresse VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD structure VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD company_duration TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD end_duration DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD registration_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD firstname VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD lastname VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD birthday DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD birthday_place VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD owner_adresse VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ADD refused BOOLEAN DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE companie DROP rcs');
        $this->addSql('ALTER TABLE companie DROP capital');
        $this->addSql('ALTER TABLE companie DROP adresse');
        $this->addSql('ALTER TABLE companie DROP structure');
        $this->addSql('ALTER TABLE companie DROP company_duration');
        $this->addSql('ALTER TABLE companie DROP end_duration');
        $this->addSql('ALTER TABLE companie DROP registration_date');
        $this->addSql('ALTER TABLE companie DROP firstname');
        $this->addSql('ALTER TABLE companie DROP lastname');
        $this->addSql('ALTER TABLE companie DROP birthday');
        $this->addSql('ALTER TABLE companie DROP birthday_place');
        $this->addSql('ALTER TABLE companie DROP owner_adresse');
        $this->addSql('ALTER TABLE companie DROP refused');
    }
}
