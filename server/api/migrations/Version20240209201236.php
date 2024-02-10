<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240209201236 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE companie DROP end_duration');
        $this->addSql('ALTER TABLE companie ALTER rcs SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER capital SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER adresse SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER structure SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER company_duration TYPE DATE');
        $this->addSql('ALTER TABLE companie ALTER registration_date SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER firstname SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER lastname SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER birthday SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER birthday_place SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER owner_adresse SET NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER refused SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE companie ADD end_duration DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE companie ALTER rcs DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER capital DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER adresse DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER structure DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER company_duration TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE companie ALTER registration_date DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER firstname DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER lastname DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER birthday DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER birthday_place DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER owner_adresse DROP NOT NULL');
        $this->addSql('ALTER TABLE companie ALTER refused DROP NOT NULL');
    }
}
