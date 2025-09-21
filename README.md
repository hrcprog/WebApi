# WebApi با JWT Authentication, Versioning, Logging و Swagger

این پروژه شامل پیاده‌سازی کامل موارد زیر است:

## ویژگی‌ها

### 1. JWT Authentication
- تولید و اعتبارسنجی توکن JWT
- کنترلر احراز هویت با endpoint های login و validate
- محافظت از API ها با `[Authorize]` attribute

### 2. API Versioning
- پشتیبانی از نسخه‌های مختلف API (v1, v2)
- خواندن نسخه از URL, Header یا Media Type
- کنترلرهای جداگانه برای هر نسخه

### 3. Logging با Serilog
- لاگ‌گیری در Console و File
- تنظیمات جداگانه برای Development و Production
- ذخیره لاگ‌ها در پوشه Logs

### 4. Swagger با Authorization و قابلیت‌های پیشرفته
- رابط کاربری Swagger کامل
- پشتیبانی از JWT Authorization
- نمایش نسخه‌های مختلف API
- دکمه‌های باز/بسته کردن همه API ها
- فیلتر بر اساس HTTP Method
- جستجوی پیشرفته در API ها
- شمارنده API های نمایش داده شده
- میانبرهای صفحه‌کلید (Ctrl+E, Ctrl+Q, Ctrl+F)
- ظاهر بهبود یافته با CSS سفارشی

## نحوه استفاده

### 1. نصب پکیج‌ها
```bash
dotnet restore
```

### 2. اجرای پروژه
```bash
dotnet run
```

### 3. دسترسی به Swagger
- باز کردن مرورگر و رفتن به: `https://localhost:7xxx` (پورت نمایش داده شده در کنسول)

### 4. احراز هویت
1. ابتدا از endpoint `/api/v1/auth/login` با اطلاعات زیر وارد شوید:
   ```json
   {
     "username": "admin",
     "password": "password"
   }
   ```

2. توکن دریافتی را در Swagger UI وارد کنید (دکمه Authorize)

### 5. استفاده از API های محافظت شده
- پس از احراز هویت، می‌توانید از API های محافظت شده استفاده کنید
- API های موجود:
  - `/api/v1/weatherforecast` - نسخه 1
  - `/api/v2/weatherforecast` - نسخه 2

## تنظیمات

### JWT Settings
در فایل `appsettings.json`:
```json
{
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "WebApi",
    "Audience": "WebApiUsers",
    "ExpirationMinutes": 60
  }
}
```

### Logging
لاگ‌ها در پوشه `Logs` ذخیره می‌شوند:
- `log-{date}.txt` - لاگ‌های عمومی
- `dev-log-{date}.txt` - لاگ‌های Development

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - ورود و دریافت توکن
- `POST /api/v1/auth/validate` - اعتبارسنجی توکن

### Weather Forecast
- `GET /api/v1/weatherforecast` - پیش‌بینی آب و هوا نسخه 1
- `GET /api/v2/weatherforecast` - پیش‌بینی آب و هوا نسخه 2 (با اطلاعات بیشتر)

## قابلیت‌های پیشرفته Swagger

### کنترل نمایش API ها
- **دکمه "باز کردن همه"**: همه API ها را به صورت همزمان باز می‌کند
- **دکمه "بستن همه"**: همه API ها را به صورت همزمان می‌بندد
- **فیلتر Method**: نمایش فقط API های خاص (GET, POST, PUT, DELETE)
- **جستجوی پیشرفته**: جستجو در نام، توضیحات و مسیر API ها

### میانبرهای صفحه‌کلید
- **Ctrl + E**: باز کردن همه API ها
- **Ctrl + Q**: بستن همه API ها  
- **Ctrl + F**: فوکوس روی فیلتر جستجو

### ویژگی‌های اضافی
- **شمارنده API**: نمایش تعداد API های قابل مشاهده
- **ظاهر بهبود یافته**: طراحی مدرن و رنگارنگ
- **پاسخگویی**: سازگار با موبایل و تبلت

## نکات مهم

1. **امنیت**: در Production حتماً SecretKey را تغییر دهید
2. **لاگ‌ها**: لاگ‌ها به صورت روزانه چرخش می‌کنند و 7 روز نگهداری می‌شوند
3. **نسخه‌بندی**: می‌توانید نسخه را از طریق URL، Header یا Media Type ارسال کنید
4. **Swagger**: در Development mode، Swagger UI در root path قرار دارد
5. **فایل‌های سفارشی**: CSS و JavaScript سفارشی در پوشه `wwwroot/swagger-ui` قرار دارند
