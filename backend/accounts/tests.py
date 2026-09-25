from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTests(TestCase):
    def test_create_user_with_role(self):
        user = User.objects.create_user(
            username='testclient',
            email='client@example.com',
            password='Password123!',
            first_name='Jean',
            last_name='Ndoumbe',
            role=User.Role.CLIENT,
            telephone='+237670000000'
        )
        self.assertEqual(user.role, User.Role.CLIENT)
        self.assertEqual(user.email, 'client@example.com')
        self.assertTrue(user.check_password('Password123!'))
        self.assertFalse(user.check_password('WrongPassword'))

    def test_create_superuser(self):
        admin = User.objects.create_superuser(
            username='adminuser',
            email='admin@feeltohome.com',
            password='AdminPassword123!'
        )
        self.assertTrue(admin.is_superuser)
        self.assertTrue(admin.is_staff)
