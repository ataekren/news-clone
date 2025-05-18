using Microsoft.EntityFrameworkCore;
using NewsAPI.Models;

namespace NewsAPI.Data;

public class NewsDbContext : DbContext
{
    public NewsDbContext(DbContextOptions<NewsDbContext> options) : base(options)
    {
    }

    public DbSet<FinanceModel> Finance { get; set; }
    public DbSet<NewsModel> News { get; set; }
    public DbSet<WeatherModel> Weather { get; set; }
    public DbSet<AdModel> Ads { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed financial data
        modelBuilder.Entity<FinanceModel>().HasData(
            new FinanceModel { Id = 1, Name = "DOLAR", Value = "37.38", Change = "+0.14%", Trend = "up" },
            new FinanceModel { Id = 2, Name = "EURO", Value = "41.64", Change = "-0.25%", Trend = "down" },
            new FinanceModel { Id = 3, Name = "STERLIN", Value = "49.01", Change = "%-1.05", Trend = "down" },
            new FinanceModel { Id = 4, Name = "BITCOIN", Value = "63,471.76", Change = "+0.13%", Trend = "up" },
            new FinanceModel { Id = 5, Name = "BIST 100", Value = "9,379.83", Change = "-1.10%", Trend = "down" },
            new FinanceModel { Id = 6, Name = "ALTIN", Value = "1,750.94", Change = "-2.25%", Trend = "down" },
            new FinanceModel { Id = 7, Name = "FAIZ", Value = "45.99", Change = "+0.50%", Trend = "up" }
        );

        // Seed news data
        modelBuilder.Entity<NewsModel>().HasData(
            new NewsModel
            {
                Id = 1,
                Title = "Kar İstanbul'a Bu Gece Sokulacak",
                Summary = "Pazartesi-Salı-Çarşamba 0'ın altında",
                ImageUrl = "https://prd.place/800/600?1",
                Category = "Gündem",
                Date = "2025-05-17"
            },
            new NewsModel
            {
                Id = 2,
                Title = "Ekonomi Bakanı Faiz Kararlarını Açıkladı",
                Summary = "Merkez bankası faiz kararları açıklandı",
                ImageUrl = "https://prd.place/800/600?2",
                Category = "Ekonomi",
                Date = "2025-05-17"
            },
            new NewsModel
            {
                Id = 3,
                Title = "Fenerbahçe Kritik Maçı Kazandı",
                Summary = "Süper Ligde liderlik yarışı kızışıyor",
                ImageUrl = "https://prd.place/800/600?3",
                Category = "Spor",
                Date = "2025-05-16"
            },
            new NewsModel
            {
                Id = 4,
                Title = "Dünyada Yeni Bir Siyasi Kriz",
                Summary = "Uluslararası ilişkilerde gerginlik tırmanıyor",
                ImageUrl = "https://prd.place/800/600?4",
                Category = "Dünya",
                Date = "2025-05-16"
            },
            new NewsModel
            {
                Id = 5,
                Title = "19 Mayıs Kutlamalarına Hazırlık",
                Summary = "Atatürk'ü Anma, Gençlik ve Spor Bayramı için hazırlıklar başladı",
                ImageUrl = "https://prd.place/800/600?5",
                Category = "Gündem",
                Date = "2025-05-15"
            },
            new NewsModel
            {
                Id = 6,
                Title = "Teknoloji Dünyasında Yeni Gelişmeler",
                Summary = "Yapay zeka alanında çığır açan buluş",
                ImageUrl = "https://prd.place/800/600?6",
                Category = "Teknoloji",
                Date = "2025-05-15"
            },
            new NewsModel
            {
                Id = 7,
                Title = "Sağlık Bakanlığından Önemli Açıklama",
                Summary = "Yeni aşı kampanyası başlatılıyor",
                ImageUrl = "https://prd.place/800/600?7",
                Category = "Sağlık",
                Date = "2025-05-14"
            },
            new NewsModel
            {
                Id = 8,
                Title = "Kripto Para Piyasasında Son Durum",
                Summary = "Bitcoin yükselişe geçti, yatırımcılar dikkatli olmalı",
                ImageUrl = "https://prd.place/800/600?8",
                Category = "Finans",
                Date = "2025-05-14"
            },
            new NewsModel
            {
                Id = 9,
                Title = "Trump'tan Yeni Açıklamalar",
                Summary = "Eski başkan siyasete geri dönüş sinyalleri veriyor",
                ImageUrl = "https://prd.place/800/600?9",
                Category = "Dünya",
                Date = "2025-05-13"
            },
            new NewsModel
            {
                Id = 10,
                Title = "İstanbul'da Trafik Sorunu Büyüyor",
                Summary = "Yeni metro hatları için çalışmalar hızlandı",
                ImageUrl = "https://prd.place/800/600?10",
                Category = "İstanbul",
                Date = "2025-05-13"
            },
            new NewsModel
            {
                Id = 11,
                Title = "Yerli Otomobil Projesi İlerliyor",
                Summary = "Türkiye'nin yerli otomobili için yeni adımlar atılıyor",
                ImageUrl = "https://prd.place/800/600?11",
                Category = "Teknoloji",
                Date = "2025-05-12"
            }
        );

        // Seed weather data
        modelBuilder.Entity<WeatherModel>().HasData(
            new WeatherModel { Id = 1, Day = "0", Temp = 16, LowTemp = 12, HighTemp = 18, Condition = "partly-cloudy" },
            new WeatherModel { Id = 2, Day = "1", Temp = 15, LowTemp = 8, HighTemp = 15, Condition = "rainy" },
            new WeatherModel { Id = 3, Day = "2", Temp = 15, LowTemp = 5, HighTemp = 15, Condition = "cloudy" },
            new WeatherModel { Id = 4, Day = "3", Temp = 13, LowTemp = 4, HighTemp = 13, Condition = "sunny" },
            new WeatherModel { Id = 5, Day = "4", Temp = 14, LowTemp = 8, HighTemp = 14, Condition = "sunny" }
        );

        // Seed ad data
        modelBuilder.Entity<AdModel>().HasData(
            new AdModel { id = 1, title = "Reklam", imageUrl = "https://prd.place/160/600?1", position = "left" },
            new AdModel { id = 2, title = "Reklam", imageUrl = "https://prd.place/160/600?2", position = "right" }
            );
    }
} 